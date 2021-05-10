const baseUrl = 'http://localhost:8082'
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.data.status !== 0) {
					return uni.showToast({
						title: '數據數據失敗'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '請求接口失敗'
				})
				reject(err)
			}
		})
	})
}
