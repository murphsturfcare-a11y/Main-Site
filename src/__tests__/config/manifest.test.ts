import manifest from "@/app/manifest";

describe("manifest", () => {
  const result = manifest();

  it("returns a valid Web App Manifest structure", () => {
    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("short_name");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("start_url");
    expect(result).toHaveProperty("display");
    expect(result).toHaveProperty("background_color");
    expect(result).toHaveProperty("theme_color");
    expect(result).toHaveProperty("icons");
  });

  it('has correct name "Murphy\'s Turf"', () => {
    expect(result.name).toBe("Murphy's Turf");
  });

  it("has short_name", () => {
    expect(result.short_name).toBe("Murphy's Turf");
  });

  it('has theme_color "#2D5016" and background_color "#ffffff"', () => {
    expect(result.theme_color).toBe("#2D5016");
    expect(result.background_color).toBe("#ffffff");
  });

  it("has icons array with at least one icon", () => {
    expect(Array.isArray(result.icons)).toBe(true);
    expect(result.icons!.length).toBeGreaterThanOrEqual(1);
  });

  it('has start_url "/" and display "standalone"', () => {
    expect(result.start_url).toBe("/");
    expect(result.display).toBe("standalone");
  });

  it("has a description", () => {
    expect(result.description).toBeDefined();
    expect(typeof result.description).toBe("string");
    expect(result.description!.length).toBeGreaterThan(0);
  });
});
