import type { Spec } from '@/content/site';

type SpecListProps = {
  specs: Spec[];
  /** Tailwind text colour for the label column. */
  labelClass?: string;
  className?: string;
};

/** Label / value rows separated by 1px lines. */
export function SpecList({ specs, labelClass = 'text-muted', className = '' }: SpecListProps) {
  return (
    <dl className={`border-b border-steel text-xs uppercase tracking-widest ${className}`}>
      {specs.map((spec) => (
        <div key={spec.label} className="grid grid-cols-3 gap-4 border-t border-steel py-4">
          <dt className={labelClass}>{spec.label}</dt>
          <dd className="col-span-2 text-clinical">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
