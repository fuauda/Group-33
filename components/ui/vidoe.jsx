import HeroVideoDialog from "../magicui/hero-video-dialog";

export function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Light mode */}
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/0qisGSwZym4" // ✅ Example: "The Power of Community" video
        thumbnailSrc="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg" // ✅ Community teamwork thumbnail
        thumbnailAlt="Community Collaboration"
      />
      {/* Dark mode */}
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/0qisGSwZym4" // ✅ same video
        thumbnailSrc="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg" // ✅ Alternative community thumbnail for dark mode
        thumbnailAlt="Community Collaboration"
      />
    </div>
  );
}
