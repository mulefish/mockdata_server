const stack = require('callsite')
const cc = require('cli-color')

const skip = {
	"handle":"",
	"next":"",
	"dispatch":"",
	"handle":"",
	"anon":"",
	"process_params":"",
	"next":"",
	"urlencodedParser":"",
	"param":""
}

class Caller {
	showObj(obj) {
		console.log(JSON.stringify(obj,null,2))
	}

	verdict(flag, msg) {
		let site = stack()
		const func = site[1].getFunctionName() || 'anon'
		const absoluteFile = site[1].getFileName()
		const ary = absoluteFile.split("\/")
		const relativeFile = ary[ary.length - 1] 

		const line = site[1].getLineNumber() 
		if ( flag === true ) {
			console.log( cc.bgGreen("PASS" ) + " " + msg + "  line: " + cc.bgYellowBright(line) + " from '" + cc.bgYellowBright(relativeFile) + "' ( func " + cc.bgYellowBright(func) + ")")
		} else {
			console.log( cc.bgRed("FAIL") + " " + msg + "  line: " + cc.bgYellowBright(line) + " from '" + cc.bgYellowBright(relativeFile) + "' ( func " + cc.bgYellowBright(func) + ")")
		}
	}


	emit(msg) {
		// Show only the method that called 
		let site = stack()
		const func = site[1].getFunctionName() || 'anon'
		const absoluteFile = site[1].getFileName()
		const ary = absoluteFile.split("\/")
		const relativeFile = ary[ary.length - 1] 

		const line = site[1].getLineNumber() 
		console.log( msg + "  line: " + cc.bgYellowBright(line) + " from '" + cc.bgYellowBright(relativeFile) + "' ( func " + cc.bgYellowBright(func) + ")")
	}


	caller() {
		// Show only the method that called 
		let site = stack()
		const func = site[1].getFunctionName() || 'anon'
		const absoluteFile = site[1].getFileName()
		const ary = absoluteFile.split("\/")
		const relativeFile = ary[ary.length - 1] 

		const line = site[1].getLineNumber() 
		console.log( "  line: " + cc.bgYellowBright(line) + " from '" + cc.bgYellowBright(relativeFile) + "' ( func " + cc.bgYellowBright(func) + ")")
	}

	showStack() {
		// Show all methods involved in calling outside of default node stuff
		let ary = stack()
		ary.forEach((site, i)=>{
			if ( i > 0 ) {
				const func = site.getFunctionName() || 'anon'
				const absoluteFile = site.getFileName()
				const ary = absoluteFile.split("\/")
				const relativeFile = ary[ary.length - 1] 
				

				const line = site.getLineNumber() 
				if ( skip.hasOwnProperty( func )) {
					// do nothing
				} else {
					console.log( cc.bold(i) + "  line: " + cc.bgYellowBright(line) + " from '" + cc.bgYellowBright(relativeFile) + "' ( func " + cc.bgYellowBright(func) + ")")

				}
			}
		});
	  }
}
module.exports={Caller}
