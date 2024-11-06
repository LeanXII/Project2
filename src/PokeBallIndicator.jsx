const PokeBallIndicator = ({ isFilled }) => {
  console.log('Is filled:', isFilled);
  
  return (
    <div style={{
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      border: isFilled ? 'none' : '2px solid white',
      margin: '0 2px',
      display: 'inline-block',
      verticalAlign: 'middle',
      backgroundImage: isFilled ? "url('/pokeball.png')" : 'none',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      transition: 'all 0.3s ease'
    }}>
    </div>
  );
};

export default PokeBallIndicator;
