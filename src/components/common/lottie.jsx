import Lottie from 'react-lottie'

const NextLottie = ({ animationData }) => {
  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
  }
  return <Lottie options={options} />
}

export default NextLottie
