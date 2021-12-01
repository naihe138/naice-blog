
export const getBrowserVersion = (agent: string): string => {
	let Browser = '';
	if (agent.indexOf('msie') > 0) { //IE
		Browser = 'Ie'
	} else if (agent.indexOf('firefox') > 0) { //firefox
		Browser = 'Firefox';
	} else if (agent.indexOf('chrome') > 0) { //Chrome
		Browser = "Chrome";
	} else if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) { // Safari
		Browser = 'Safari'
	} else {
		Browser = 'Chrome'
	}
	return Browser;
}

export const currentSystem = (str): string => {
	const reg = /mac/ig
	return reg.test(str) ? 'Mac' : 'Window'
}

export const avarterArr: string[] = [
	'avatar/1.jpg',
	'avatar/2.jpg',
	'avatar/3.jpg',
	'avatar/4.jpg',
	'avatar/5.jpg',
	'avatar/6.jpg',
	'avatar/7.jpg',
	'avatar/8.jpg',
	'avatar/9.jpg',
	'avatar/10.jpeg',
	'avatar/12.jpg',
	'avatar/14.jpg',
	'avatar/15.jpg',
	'avatar/16.jpg',
	'avatar/17.jpeg',
	'avatar/19.jpeg',
	'avatar/20.jpeg'
]

export const avarterLength = avarterArr.length
