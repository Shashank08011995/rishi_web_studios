export default function BrowserFrame({ src, alt, tall = false }) {
  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
      </div>
      <div className="browser-window" style={tall ? { height: 360 } : undefined}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
