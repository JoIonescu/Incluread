import { useEffect } from "react";

interface LandingPageProps {
  /** Primary CTA: go to the main page (Library) */
  onStartReading: () => void;
  /** Link CTA: go to the walkthrough */
  onWalkthrough: () => void;
}

// First page for new and returning visitors.
// Desktop: text on the left, artwork anchored bottom-right (positions are % of the page, taken from the design).
// Mobile: single column — logo, headline, text, full-width CTA, link, then the artwork underneath.
export default function LandingPage({ onStartReading, onWalkthrough }: LandingPageProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Incluread — Reading should work for everyone";
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main
      id="landing-root"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white font-sans text-[#19334A]"
    >
      {/* Text column */}
      <div className="relative z-10 flex flex-1 flex-col px-6 pb-8 pt-6 sm:px-10 sm:pt-8 lg:pb-[16svh] lg:pl-[7.5%] lg:pr-0 lg:pt-[6.5svh]">
        <header>
          <img
            src="/landing/incluread-logo.png"
            alt="Incluread"
            width={1981}
            height={449}
            className="h-auto w-[150px] sm:w-[180px] lg:w-[14vw] lg:min-w-[170px] lg:max-w-[300px]"
          />
        </header>

        <div className="mt-10 sm:mt-12 lg:mt-[8.5svh] lg:max-w-[52%]">
          <h1 className="text-[clamp(2.75rem,12.5vw,4rem)] font-extrabold leading-[1.03] tracking-[-0.025em] sm:text-[clamp(3.5rem,9vw,5rem)] lg:text-[clamp(3.5rem,6vw,9rem)]">
            Reading should work for{" "}
            <span className="whitespace-nowrap text-[#FE8460]">everyone.</span>
          </h1>

          <p className="mt-6 max-w-[22rem] text-[1.125rem] leading-[1.5] sm:mt-8 sm:max-w-md sm:text-xl lg:mt-[3.2vw] lg:max-w-none lg:text-[clamp(1.25rem,2.2vw,3.2rem)] lg:leading-[1.38]">
            IncluRead helps you read, learn
            <br className="hidden lg:block" /> and remember in a way that
            <br className="hidden lg:block" /> feels right for you.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-1 sm:mt-10 sm:flex-row sm:items-center sm:gap-8 lg:mt-auto lg:gap-[3.3vw] lg:pt-10">
          <button
            type="button"
            onClick={onStartReading}
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#FE987A] px-10 text-base font-bold text-[#19334A] shadow-[0_10px_24px_-10px_rgba(254,152,122,0.8)] transition-all hover:bg-[#F5865F] active:scale-[0.98] lg:h-[clamp(3.5rem,3.8vw,5.5rem)] lg:rounded-[clamp(1.25rem,1.3vw,2rem)] lg:px-[clamp(2rem,3.5vw,5rem)] lg:text-[clamp(1rem,1.3vw,2rem)]"
          >
            Start Reading
          </button>
          <a
            href="/walkthrough"
            onClick={(e) => {
              e.preventDefault();
              onWalkthrough();
            }}
            className="inline-flex min-h-12 items-center justify-center text-base font-medium underline decoration-[1.5px] underline-offset-4 transition-colors hover:text-[#016271] lg:text-[clamp(1rem,1.25vw,1.9rem)]"
          >
            Walk me through
          </a>
        </div>
      </div>

      {/* Artwork */}
      <div
        aria-hidden="false"
        className="relative mx-auto w-full pt-[17%] sm:max-w-[640px] lg:pointer-events-none lg:absolute lg:inset-0 lg:mx-0 lg:max-w-none lg:pt-0"
      >
        <img
          src="/landing/circles-cluster.webp"
          alt=""
          width={640}
          height={553}
          className="absolute left-[5%] top-[2%] w-[26%] lg:left-[56.6%] lg:top-[21.4%] lg:w-[11.6%]"
        />
        <img
          src="/landing/circle-small.webp"
          alt=""
          width={256}
          height={256}
          className="absolute right-[8%] top-[4%] w-[10%] lg:left-[81.45%] lg:right-auto lg:top-[12.8%] lg:w-[4.6%]"
        />
        <img
          src="/landing/hero-reader-1400.webp"
          srcSet="/landing/hero-reader-900.webp 900w, /landing/hero-reader-1400.webp 1400w, /landing/hero-reader-2000.webp 2000w"
          sizes="(min-width: 1024px) 57vw, (min-width: 640px) 640px, 100vw"
          alt="A woman reading on a tablet"
          width={1400}
          height={1030}
          decoding="async"
          className="relative ml-auto block h-auto w-full lg:absolute lg:bottom-0 lg:right-0 lg:w-[56.8%]"
        />
      </div>
    </main>
  );
}