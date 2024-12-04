export const generateAvatarUrls = (count) => {
    return Array.from({ length: count }, (_, index) => 
      `https://avatar.iran.liara.run/public/${index + 1}`
    );
  };
  