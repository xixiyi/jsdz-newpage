function matchSquarenum(squarenumString, guige, mingxidanwei, callback) {
    squarenumString = squarenumString.replace(/,/g, "，")
    var squarenumarr = []
    squarenumarr = squarenumString.split("，")
    var istoallnum = 0;
    var iallsquarenum = 0;
    if (squarenumarr.length > 0) {
        for (var i = 0; i < squarenumarr.length; i++) {
            if (squarenumarr[i].split("*")[1] == undefined) {
                istoallnum++
                iallsquarenum += Number(squarenumarr[i].split("*")[0])
            } else {
                istoallnum = istoallnum + Number(squarenumarr[i].split("*")[0])
                iallsquarenum += Number(squarenumarr[i].split("*")[0]) * Number(squarenumarr[i].split("*")[1])
            }
        }
    }
    var guigearr = guige.split("*")
    var kuandu = guigearr[1] || "1"
    var result = {}
    if (mingxidanwei == '米') {
        result.zhishu = changeNum(istoallnum, 2)
        result.mishu = changeNum(iallsquarenum, 2)
        result.pingmi = changeNum(iallsquarenum * Number(kuandu), 2)
        result.num = changeNum(iallsquarenum, 2)
    } else if (mingxidanwei == '平米') {
        result.zhishu = changeNum(istoallnum, 2)
        result.mishu = changeNum(iallsquarenum / Number(kuandu), 2)
        result.pingmi = changeNum(iallsquarenum, 2)
        result.num = changeNum(iallsquarenum, 2)
    } else {
        result.zhishu = changeNum(istoallnum, 2)
        result.mishu = changeNum(iallsquarenum, 2)
        result.pingmi = changeNum(iallsquarenum, 2)
        result.num = changeNum(iallsquarenum, 2)
    }
    callback(result)
}

function matchSquarenumTwo(squarenumString, guige, mingxidanwei,xiliedanwei, callback) {
    squarenumString = squarenumString.replace(/,/g, "，")
    var squarenumarr = []
    squarenumarr = squarenumString.split("，")
    var istoallnum = 0;
    var iallsquarenum = 0;
    if (squarenumarr.length > 0) {
        for (var i = 0; i < squarenumarr.length; i++) {
            if (squarenumarr[i].split("*")[1] == undefined) {
                istoallnum++
                iallsquarenum += Number(squarenumarr[i].split("*")[0])
            } else {
                istoallnum = istoallnum + Number(squarenumarr[i].split("*")[0])
                iallsquarenum += Number(squarenumarr[i].split("*")[0]) * Number(squarenumarr[i].split("*")[1])
            }
        }
    }
    var guigearr = guige.split("*")
    var kuandu = guigearr[1] || "1"
    var result = {}
    if (mingxidanwei == '米') {
        result.zhishu = changeNum(istoallnum, 2)
        result.mishu = changeNum(iallsquarenum, 2)
        result.pingmi = changeNum(iallsquarenum * Number(kuandu), 2)
        result.num = changeNum(iallsquarenum, 2)
    } else if (mingxidanwei == '平米') {
        result.zhishu = changeNum(istoallnum, 2)
        result.mishu = changeNum(iallsquarenum / Number(kuandu), 2)
        result.pingmi = changeNum(iallsquarenum, 2)
        result.num = changeNum(iallsquarenum, 2)
    } else {
        result.zhishu = changeNum(istoallnum, 2)
        result.mishu = changeNum(iallsquarenum, 2)
        result.pingmi = changeNum(iallsquarenum, 2)
        result.num = changeNum(istoallnum, 2)
    }

    if(xiliedanwei != mingxidanwei){
        if(xiliedanwei=='平米'){
            result.num = result.pingmi
        }else if(xiliedanwei=='米'){
            result.num = result.mishu
        }
    }





    callback(result)
}

function changeNum(squarenum, num) {
    squarenum = Number(Number(squarenum).toFixed(num))
    return squarenum
}

export default {
    matchSquarenum,
    matchSquarenumTwo,
    changeNum
}