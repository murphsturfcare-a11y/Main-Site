import robots from "@/app/robots";

describe("robots", () => {
  it("returns rules with userAgent set to wildcard", () => {
    const result = robots();
    expect(result.rules).toBeDefined();

    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules.userAgent).toBe("*");
  });

  it("allows the root path", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules.allow).toBe("/");
  });

  it("disallows /admin/ and /api/", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules.disallow).toContain("/admin/");
    expect(rules.disallow).toContain("/api/");
  });

  it("includes the sitemap URL", () => {
    const result = robots();
    expect(result.sitemap).toBe("https://murphysturf.com/sitemap.xml");
  });
});

// Specific bot groups must never bypass the wildcard's exclusions.
it("applies private-path exclusions consistently to search and AI crawlers", () => {
  const result = robots();
  const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
  for (const rule of rules) {
    expect(rule.disallow).toContain("/admin/");
    expect(rule.disallow).toContain("/api/");
  }
});
