const size = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1200px',
};

const theme = {
  white: '#ffffff',
  mainColor: '#4748C6',
  subColor: '#1B1B1B',
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default theme;
