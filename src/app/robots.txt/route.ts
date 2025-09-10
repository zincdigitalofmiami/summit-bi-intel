export function GET() {
  return new Response(`User-agent: *\nDisallow: /`, {
    headers: { 'Content-Type': 'text/plain' },
  });
}


