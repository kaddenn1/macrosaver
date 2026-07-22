const BLOBS = [
  { color: "#a3e635", top: "2%", left: "15%", size: 560, duration: 22 },
  { color: "#a3e635", top: "30%", left: "88%", size: 500, duration: 26 },
  { color: "#a3e635", top: "62%", left: "8%", size: 520, duration: 24 },
  { color: "#a3e635", top: "90%", left: "82%", size: 500, duration: 28 },
];

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {BLOBS.map((blob, idx) => (
        <div
          key={idx}
          className="absolute"
          style={{ top: blob.top, left: blob.left }}
        >
          <div
            className="animate-blob-drift rounded-full blur-[90px]"
            style={{
              width: blob.size,
              height: blob.size,
              backgroundColor: blob.color,
              opacity: 0.14,
              animationDuration: `${blob.duration}s`,
              animationDelay: `${idx * -4}s`,
              marginLeft: -blob.size / 2,
              marginTop: -blob.size / 2,
            }}
          />
        </div>
      ))}
    </div>
  );
}
