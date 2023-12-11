require("dotenv").config()
const youtube_api_key = process.env.YOUTUBE_API_KEY // eslint-disable-line no-undef

/**
 * Retrieves the length of a YouTube video.
 * @param {string} videoId - The YouTube video ID.
 * @param {string} format - The desired format for the video length ('seconds', 'minutes', 'hours').
 * @returns {Promise<number>} The length of the video in the specified format.
 */
async function getVideoLength(videoId, format = "seconds") {
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${youtube_api_key}&fields=items(contentDetails(duration))&part=contentDetails`
    const response = await fetch(url)
    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      throw new Error("Video not found")
    }

    const duration = data.items[0].contentDetails.duration
    return convertDuration(duration, format)
  } catch (error) {
    console.error("Error fetching video length:", error)
    throw error
  }
}

/**
 * Converts ISO 8601 duration to the desired format.
 * @param {string} duration - The ISO 8601 duration string.
 * @param {string} format - The desired format ('seconds', 'minutes', 'hours').
 * @returns {number} The converted duration.
 */
function convertDuration(duration, format) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  const hours = (parseInt(match[1]) || 0) * 3600
  const minutes = (parseInt(match[2]) || 0) * 60
  const seconds = parseInt(match[3]) || 0
  const totalSeconds = hours + minutes + seconds

  switch (format) {
    case "minutes":
      return totalSeconds / 60
    case "hours":
      return totalSeconds / 3600
    default:
      return totalSeconds
  }
}

module.exports = {
  getVideoLength,
}
