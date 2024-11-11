import gsap from 'gsap'


export const animatePlayer = () => {
  gsap.to(".player-sprite", {
    ease: "none",
    y: -60,
    x: 80,

    duration: 0.2,
    yoyo: true,
    repeat: 1,
  });
};

export const animateOpponent = () => {
  gsap.to(".opponent-sprite", {
    ease: "none",
    y: 60,
    x: -80,

    duration: 0.2,
    yoyo: true,
    repeat: 1,
  });
};