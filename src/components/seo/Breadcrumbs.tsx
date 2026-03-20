import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { SITE_URL } from "@/lib/seo/constants";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: `${SITE_URL}${item.href}`,
  }));

  return (
    <>
      <JsonLd schema={generateBreadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <ol className="flex items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {index > 0 && <span aria-hidden="true">/</span>}
                {isLast ? (
                  <span aria-current="page" className="text-gray-900">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-gray-700">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
