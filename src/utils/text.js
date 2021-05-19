const textUtils = {
  truncate: function (text, length, clamp) {
    const clampText = clamp || '...';
    return text.length > length ? text.slice(0, length) + clampText : text;
  },
};

export default textUtils;
