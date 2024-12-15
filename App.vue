<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			// 初始化时检查未读消息
			setTimeout(() => {
				this.checkUnreadMessages()
			}, 0)
		},
		onShow: function() {
			// 在应用显示时检查未读消息
			this.checkUnreadMessages()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async checkUnreadMessages() {
				try {
					// 模拟从消息列表中计算未读总数
					const messageList = this.globalData.messageList || []
					const unreadCount = messageList.reduce((sum, msg) => sum + (msg.unread || 0), 0)
					
					this.globalData.messageUnreadCount = unreadCount
					
					if (unreadCount > 0) {
						// 确保当前页面是 tabBar 页面时才设置 badge
						const pages = getCurrentPages()
						const currentPage = pages[pages.length - 1]
						if (currentPage && currentPage.route && ['pages/home/home', 'pages/discover/discover', 'pages/publish/publish', 'pages/message/message', 'pages/myAccount/myAccount'].includes(currentPage.route)) {
							uni.setTabBarBadge({
								index: 3,
								text: String(unreadCount)
							})
						}
					} else {
						// 同样检查当前页面
						const pages = getCurrentPages()
						const currentPage = pages[pages.length - 1]
						if (currentPage && currentPage.route && ['pages/home/home', 'pages/discover/discover', 'pages/publish/publish', 'pages/message/message', 'pages/myAccount/myAccount'].includes(currentPage.route)) {
							uni.removeTabBarBadge({
								index: 3
							})
						}
					}
				} catch (error) {
					console.error('检查未读消息失败:', error)
				}
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
