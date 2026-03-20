import { createBrowserClient as createBrowserSupabaseClient } from "@supabase/ssr";
import { createServerClient as createServerSupabaseClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { CookieOptions } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Creates a Supabase client for use in Server Components, Server Actions,
 * and Route Handlers. Reads and writes cookies via next/headers.
 *
 * Must be called within a request context (not at module scope).
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return createServerSupabaseClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // `setAll` is called from a Server Component where cookies
          // cannot be mutated. This is safe to ignore because the
          // middleware will refresh the session before the component renders.
        }
      },
    },
  });
}

/**
 * Creates a Supabase client for use in Client Components.
 * Uses browser-native cookie storage under the hood.
 */
export function createBrowserClient() {
  return createBrowserSupabaseClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Returns the current user session, or null if the user is not authenticated.
 * Intended for use in Server Components, Server Actions, and Route Handlers.
 */
export async function getSession() {
  const supabase = await createServerClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Failed to retrieve session:", error.message);
    return null;
  }

  return session;
}
