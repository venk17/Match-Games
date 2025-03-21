import './index.css'

const ImageItem = props => {
  const {imageList, onThumbnailClick} = props
  const {id, thumbnailUrl, imageUrl} = imageList

  const handleThumbnailClick = () => {
    onThumbnailClick(imageUrl)
  }

  return (
    <li>
      <button
        className="img-button"
        type="button"
        onClick={handleThumbnailClick}
      >
        <img src={thumbnailUrl} className="thumbnail" alt="thumbnail" />
      </button>
    </li>
  )
}

export default ImageItem
