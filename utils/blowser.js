
export const getBrowserVersion = (agent) => {
	let Browser = '';
	//IE
	if (agent.indexOf('msie') > 0) {
		let regStr_ie = /msie [\d.]+;/gi
		Browser = 'Ie'
	}
	//firefox
	else if (agent.indexOf('firefox') > 0) {
		let regStr_ff = /firefox\/[\d.]+/gi;
		Browser = 'Firefox';
	}
	//Chrome
	else if (agent.indexOf('chrome') > 0) {
		let regStr_chrome = /chrome\/[\d.]+/gi;
		Browser = "Chrome";
	}
	// Safari
	else if (agent.indexOf('safari') > 0 && agent.indexOf
('chrome') < 0) {
		let regStr_saf = /version\/[\d.]+/gi;
		Browser = 'Safari'
	} else {
		Browser = 'Chrome'
	}
	return Browser;
}

export const currentSystem = (str) => {
	const reg = /mac/ig
	return reg.test(str) ? 'Mac' : 'Window'
}

export const avarterArr = [
	'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3954676606,1888158900&fm=11&gp=0.jpg',
	'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1286998490,3468341349&fm=11&gp=0.jpg',
	'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=353868547,2822233069&fm=27&gp=0.jpg',
	'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1178011732,3353631614&fm=27&gp=0.jpg',
	'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2481763586,4087522518&fm=27&gp=0.jpg',
	'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1034317729,337624616&fm=27&gp=0.jpg',
	'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=128013007,1946750280&fm=27&gp=0.jpg',
	'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4148795727,732143832&fm=27&gp=0.jpg',
	'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4121225864,785761951&fm=27&gp=0.jpg',
	'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3619070856,3103619106&fm=27&gp=0.jpg',
	'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1910862757,2676655804&fm=27&gp=0.jpg',
	'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=977468359,542518020&fm=27&gp=0.jpg',
	'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=600840806,2113634000&fm=27&gp=0.jpg',
	'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2475222708,3513835460&fm=27&gp=0.jpg',
	'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1478849654,1851926890&fm=27&gp=0.jpg',
	'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1921393379,4069134737&fm=27&gp=0.jpg',
	'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1067594990,1110172622&fm=27&gp=0.jpg',
	'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=566083323,1162924276&fm=27&gp=0.jpg',
	'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2200767505,492420988&fm=27&gp=0.jpg',
	'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1873573939,3515804663&fm=27&gp=0.jpg'
]

