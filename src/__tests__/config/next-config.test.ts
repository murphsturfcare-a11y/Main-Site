import nextConfig from "../../../next.config";

describe("next.config.ts", () => {
  it("is a valid Next.js config object", () => {
    expect(nextConfig).toBeDefined();
    expect(nextConfig).not.toBeNull();
    expect(typeof nextConfig).toBe("object");
  });

  it("has output set to 'export' for static export", () => {
    expect(nextConfig.output).toBe("export");
  });

  it("has poweredByHeader set to false", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("has images.unoptimized set to true", () => {
    expect(nextConfig.images).toBeDefined();
    expect(nextConfig.images?.unoptimized).toBe(true);
  });
});
