import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-mist px-6 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/az"
          className="mt-6 inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
