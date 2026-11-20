export function HomeSectionHeading({
  id,
  label,
  heading,
}: {
  id: string;
  label: string;
  heading: string;
}) {
  return (
    <>
      <p className="mb-4 flex items-center gap-3 text-xs leading-relaxed font-semibold tracking-[0.14em] text-purple uppercase sm:mb-5">
        <span aria-hidden="true" className="h-px w-7 shrink-0 bg-gold" />
        {label}
      </p>
      <h2 id={id} className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-charcoal">
        {heading}
      </h2>
    </>
  );
}
