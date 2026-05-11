/**
 * Hybrid Logo: original brand image inside a polished container.
 * Preserves user identity (the original logo) while elevating the presentation.
 */
import logoImg from '../../assets/logo.png';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

const sizes = {
  sm: 'w-9 h-9',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export default function Logo({ size = 'md', showWordmark = false }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizes[size]} rounded-2xl overflow-hidden shadow-lg ring-2 ring-brand-primary/30 shadow-brand-primary/20 flex-shrink-0`}
        style={{ background: 'linear-gradient(135deg, #050510 0%, #0F0F1F 100%)' }}
      >
        <img src={logoImg} alt="KB" className="w-full h-full object-cover" />
      </div>
      {showWordmark && (
        <div className="leading-tight">
          <div className="font-extrabold text-base sm:text-lg gradient-text-brand">KB</div>
          <div className="text-[10px] sm:text-xs text-text-3 font-semibold tracking-widest uppercase opacity-70">
            Kuwait Bourse
          </div>
        </div>
      )}
    </div>
  );
}
