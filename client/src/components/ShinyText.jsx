import './ShinyText.css';

const ShinyText = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left'
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    animationDuration: `${speed}s`,
    animationDirection: yoyo ? 'alternate' : direction === 'left' ? 'normal' : 'reverse',
  };

  return (
    <span
      className={`shiny-text ${disabled ? '' : 'animate-shine'} ${pauseOnHover ? 'pause-on-hover' : ''} ${className}`}
      style={gradientStyle}
    >
      {text}
    </span>
  );
};

export default ShinyText;
