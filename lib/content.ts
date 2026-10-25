import fs from "node:fs";
import path from "node:path";

export type Tip = {
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  markdown: string;
  searchableText: string;
};

export type Category = {
  title: string;
  slug: string;
  tips: Tip[];
};

const preferredContentOrder = [
  "db-models-and-eloquent.md",
  "models-relations.md",
  "migrations.md",
  "views.md",
  "routing.md",
  "validation.md",
  "collections.md",
  "auth.md",
  "mail.md",
  "artisan.md",
  "factories.md",
  "log-and-debug.md",
  "reliability-and-performance.md",
  "api.md",
  "other.md",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function searchableText(markdown: string) {
  return markdown
    .replace(/^\s*```[^\n]*\n?/gm, " ")
    .replace(/^\s*~~~[^\n]*\n?/gm, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function professionalTitle(value: string) {
  const smallWords = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "with", "without"]);
  return value
    .split(/\s+/)
    .map((part, index, parts) => {
      const word = part.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
      if (!word) return part;
      const lower = word.toLowerCase();
      const isEdge = index === 0 || index === parts.length - 1;
      const formatted = !isEdge && smallWords.has(lower) ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
      return part.replace(word, formatted);
    })
    .join(" ")
    .replace(/\bApi\b/g, "API")
    .replace(/\bSql\b/g, "SQL")
    .replace(/\bUrl\b/g, "URL")
    .replace(/\bJson\b/g, "JSON")
    .replace(/\bHttp\b/g, "HTTP")
    .replace(/\bPhp\b/g, "PHP")
    .replace(/\bBlade-X\b/gi, "Blade X");
}

function professionalDescription(title: string, category: string, markdown: string) {
  const paragraphs = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[`*_>#~]/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim())
    .filter(Boolean);

  let summary = paragraphs[0] || `Practical Laravel guidance for ${title.toLowerCase()}, with examples and copyable PHP code.`;
  if (summary.length < 90 && paragraphs[1]) summary += ` ${paragraphs[1]}`;
  summary = summary.replace(/[\s,;:]+$/g, "");
  if (summary.length > 160) {
    const excerpt = summary.slice(0, 157);
    const lastWord = excerpt.lastIndexOf(" ");
    summary = `${excerpt.slice(0, lastWord > 100 ? lastWord : 157).trimEnd()}…`;
  }
  return summary;
}

function isTipHeading(line: string) {
  return /^###\s+(.+?)\s*$/.exec(line);
}

function readCategory(filename: string): Category {
  const source = fs.readFileSync(path.join(process.cwd(), "knowledge-base", filename), "utf8");
  const lines = source.split(/\r?\n/);
  const categoryHeading = lines.find((line) => line.startsWith("## "));
  if (!categoryHeading) throw new Error(`Missing category heading in ${filename}`);
  const title = categoryHeading.slice(3).trim();
  const categorySlug = filename.replace(/\.md$/, "");
  const tips: Tip[] = [];
  let currentTitle = "";
  let currentBody: string[] = [];
  let fenceChar = "";
  let fenceLength = 0;

  const saveTip = () => {
    if (!currentTitle) return;
    const markdown = currentBody.join("\n").trim();
    const baseSlug = slugify(currentTitle) || "tip";
    const slug = tips.some((tip) => tip.slug === baseSlug)
      ? `${baseSlug}-${tips.length + 1}`
      : baseSlug;
    const polishedTitle = professionalTitle(currentTitle);
    tips.push({ title: polishedTitle, slug, category: title, categorySlug, description: professionalDescription(polishedTitle, title, markdown), markdown, searchableText: searchableText(markdown) });
  };

  for (const line of lines) {
    const fence = /^\s*(`{3,}|~{3,})/.exec(line);
    if (fence) {
      const marker = fence[1][0];
      if (!fenceChar) {
        fenceChar = marker;
        fenceLength = fence[1].length;
      } else if (marker === fenceChar && fence[1].length >= fenceLength) {
        fenceChar = "";
        fenceLength = 0;
      }
      if (currentTitle) currentBody.push(line);
      continue;
    }

    const heading = !fenceChar && isTipHeading(line);
    if (heading) {
      saveTip();
      currentTitle = heading[1].trim();
      currentBody = [];
    } else if (currentTitle) {
      currentBody.push(line);
    }
  }
  saveTip();

  return { title, slug: categorySlug, tips };
}

export function getCategories(): Category[] {
  const markdownFiles = fs.readdirSync(path.join(process.cwd(), "knowledge-base"))
    .filter((filename) => filename.endsWith(".md"));
  markdownFiles.sort((left, right) => {
    const leftIndex = preferredContentOrder.indexOf(left);
    const rightIndex = preferredContentOrder.indexOf(right);
    if (leftIndex < 0 && rightIndex < 0) return left.localeCompare(right);
    if (leftIndex < 0) return 1;
    if (rightIndex < 0) return -1;
    return leftIndex - rightIndex;
  });
  return markdownFiles.map(readCategory);
}

export function getCategory(slug: string) {
  return getCategories().find((category) => category.slug === slug);
}

export function getAllTips() {
  return getCategories().flatMap((category) => category.tips);
}

export function getTip(categorySlug: string, tipSlug: string) {
  return getCategory(categorySlug)?.tips.find((tip) => tip.slug === tipSlug);
}
