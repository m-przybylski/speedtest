/**
 * Parse result form speedtest
 * @param {Object} result 
 * @returns {{ ping: number, download: number, upload: number }}
 */
function parseResult(result) {
  const ping = Math.round(result.ping.latency)
  const download = result.download.bandwidth
  const upload = result.upload.bandwidth

  return {
    ping, download, upload
  }
}

export {
  parseResult
}