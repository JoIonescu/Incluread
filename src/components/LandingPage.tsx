import { useEffect } from "react";

interface LandingPageProps {
  /** Primary CTA: go to the main page (Library) */
  onStartReading: () => void;
  /** Link CTA: go to the walkthrough */
  onWalkthrough: () => void;
}

// First page for new and returning visitors.
// Desktop: fits exactly one screen (no vertical scroll); text on the left, artwork anchored bottom-right.
// Sizes use min(vw, svh) so short/wide windows shrink the content instead of scrolling.
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
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white font-sans text-[#19334A] lg:h-[100svh] lg:min-h-[520px]"
    >
      {/* Text column */}
      <div className="relative z-10 flex flex-col px-6 pb-6 pt-6 sm:px-10 sm:pt-8 lg:flex-1 lg:pb-[10svh] lg:pl-[7.5%] lg:pr-0 lg:pt-[5svh]">
        <header>
          <img
            src="/landing/incluread-logo.png"
            alt="Incluread"
            width={1981}
            height={449}
            className="h-auto w-[140px] sm:w-[170px] lg:w-[min(12vw,22svh)] lg:min-w-[140px] lg:max-w-[260px]"
          />
        </header>

        <div className="mt-8 sm:mt-10 lg:mt-[7svh] lg:max-w-[60%]">
          <h1 className="text-[min(11.5vw,7.2svh)] font-extrabold leading-[1.04] tracking-[-0.025em] sm:text-[min(9vw,7.2svh)] lg:text-[max(2rem,min(4.4vw,8svh))]">
            Reading should work<br className="hidden lg:block" /> for{" "}
            <span className="whitespace-nowrap text-[#FE8460]">everyone.</span>
          </h1>

          <p className="mt-5 max-w-[22rem] text-[1.0625rem] leading-[1.5] sm:mt-6 sm:max-w-md sm:text-lg lg:mt-[min(2.4vw,4.5svh)] lg:max-w-none lg:text-[max(1rem,min(1.9vw,3.6svh))] lg:leading-[1.4]">
            IncluRead helps you read, learn
            <br className="hidden lg:block" /> and remember in a way that
            <br className="hidden lg:block" /> feels right for you.
          </p>
        </div>

        <div className="mt-7 flex flex-col items-stretch gap-1 sm:mt-8 sm:flex-row sm:items-center sm:gap-8 lg:mt-auto lg:gap-[min(3vw,5svh)] lg:pt-4">
          <button
            type="button"
            onClick={onStartReading}
            className="inline-flex h-[52px] items-center justify-center rounded-2xl bg-[#FE987A] px-10 text-base font-bold text-[#19334A] shadow-[0_10px_24px_-10px_rgba(254,152,122,0.8)] transition-all hover:bg-[#F5865F] active:scale-[0.98] lg:h-[max(3rem,min(3.4vw,6.8svh))] lg:rounded-[min(1.1vw,2.2svh)] lg:px-[min(3vw,6svh)] lg:text-[max(0.9375rem,min(1.15vw,2.3svh))]"
          >
            Start Reading
          </button>
          <a
            href="/walkthrough"
            onClick={(e) => {
              e.preventDefault();
              onWalkthrough();
            }}
            className="inline-flex min-h-12 items-center justify-center text-base font-medium underline decoration-[1.5px] underline-offset-4 transition-colors hover:text-[#016271] lg:text-[max(0.9375rem,min(1.1vw,2.2svh))]"
          >
            Walk me through
          </a>
        </div>
      </div>

      {/* Artwork: one box so the circles always keep their position relative to the photo */}
      <div className="relative min-h-[220px] w-full flex-1 lg:pointer-events-none lg:absolute lg:bottom-0 lg:right-0 lg:aspect-[1965/1948] lg:min-h-0 lg:w-[min(50vw,95svh)] lg:flex-none">
        <img
          src="/landing/circles-cluster.webp"
          alt=""
          width={640}
          height={553}
          className="absolute left-[5%] top-[2%] w-[24%] max-w-[120px] lg:left-[23.6%] lg:top-[9.86%] lg:w-[20.4%] lg:max-w-none"
        />
        <img
          src="/landing/circle-small.webp"
          alt=""
          width={256}
          height={256}
          className="absolute right-[8%] top-[4%] w-[10%] max-w-[44px] lg:left-[67.4%] lg:right-auto lg:top-0 lg:w-[8.09%] lg:max-w-none"
        />
        <img
          src="/landing/hero-reader-1400.webp"
          srcSet="/landing/hero-reader-900.webp 900w, /landing/hero-reader-1400.webp 1400w, /landing/hero-reader-2000.webp 2000w"
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt="A woman reading on a tablet"
          width={1400}
          height={1030}
          decoding="async"
          className="absolute bottom-0 right-0 h-[88%] w-full object-contain object-right-bottom lg:h-auto lg:w-full lg:object-fill"
        />
      </div>
    </main>
  );
}