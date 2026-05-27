interface Stat {
  value: string;
  label: string;
}

interface Props {
  stats: {
    experience: Stat;
    toshiba: Stat;
    projects: Stat;
    solutions: Stat;
  };
}

export function Stats({ stats }: Props) {
  const items = [stats.experience, stats.toshiba, stats.projects, stats.solutions];
  return (
    <section className="relative z-20 -mt-20 sm:-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="theme-dark-panel grid grid-cols-2 overflow-hidden rounded-[1.75rem] border border-white/14 bg-[#07111f]/88 shadow-[0_34px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.label}
              className="theme-dark-stat group relative min-h-[150px] overflow-hidden border-white/10 p-5 transition-colors hover:bg-white/[0.06] sm:p-7 lg:border-l first:lg:border-l-0 [&:nth-child(2)]:border-l [&:nth-child(4)]:border-l"
            >
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-grid-dark opacity-0 transition-opacity duration-300 group-hover:opacity-35"
                aria-hidden="true"
              />
              <div className="theme-card-faint relative text-[10px] font-semibold uppercase tracking-[0.24em] text-white/38">
                0{index + 1}
              </div>
              <div className="theme-card-title relative mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {item.value}
              </div>
              <div className="theme-card-muted relative mt-2 max-w-[16rem] text-sm leading-snug text-white/62">
                {item.label}
              </div>
              <div
                className="absolute bottom-0 left-5 h-px w-12 bg-gradient-to-r from-tech via-emerald to-transparent transition-all duration-300 group-hover:w-24 sm:left-7"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
