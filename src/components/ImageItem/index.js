import './index.css'

const ImageItem = ({imageDetails, onThumbnailClick}) => {
  const {thumbnailUrl} = imageDetails

  const onClickThumbnail = () => {
    onThumbnailClick(imageDetails.imageUrl)
  }

  return (
    <li className="image-item">
      <button
        type="button"
        className="thumbnail-button"
        onClick={onClickThumbnail}
      >
        <img src={thumbnailUrl} className="thumbnail" alt="thumbnail" />
      </button>
    </li>
  )
}

export default ImageItem
