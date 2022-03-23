import { FormControl } from "@angular/forms"

export class Validator
{
    private luhAlgorithm(idNo : string) : number {
        var sum : number = 0;
        for (let index = 0; index < 13; index++) {// for the length of the id
            //if index is even
            if(index%2 == 0){
                sum += parseInt(idNo[index]);
            }
            //if index is odd
            else{
                
                var doubledDigit : number = 2*parseInt(idNo[index])
                //double the digit if it is less than or equal to 9
                if (doubledDigit <=9 && doubledDigit > -1 ) {
                    sum += doubledDigit
                }
                // if its greater than 9 add the numbers two digits e.g. 8*2 = 16 1+6 = 7
                else if (doubledDigit < 9 ) {
                    var firstDigit: string = doubledDigit.toString().slice(0,1)
                    var lastDigit: string = doubledDigit.toString().slice(1)
                    var toAdd : number = parseInt(lastDigit) + parseInt(firstDigit)
                    sum += toAdd
                }
            }
            
        }

        var returnValue : number = sum%10 // remainder after the sum is divided by 10
        return returnValue 
    }

    validID(formControl : FormControl) : {[valtype : string] : boolean} | null{
        var idNo : string = formControl.value 
        var validDOB: boolean = false
        var validGender: boolean = false
        var validCitizen: boolean  = false
        var validCheckSum: boolean = false
        if (idNo.length == 13) {
            var year : number = parseInt(idNo.slice(0,2)) 
            var month : number = parseInt(idNo.slice(2,4))
            var day : number = parseInt(idNo.slice(4,6))

            if ((year <= 4 && year > -1) && (month <= 12 && month > 0) && (day <= 31 && day > 0) ) {
                validDOB = true;
            }
            else if (( year >= 62&& year < 100) && (month <= 12 && month > 0) && (day <= 31 && day > 0) ) { // if user is older than 18 but younger than 60
                 validDOB = true;
            }

            var gender : number = parseInt(idNo.slice(6,10))
            if (gender >= 0 && gender <= 9999) {
                validGender = true;
            }

            var citizen: number = parseInt(idNo.slice(10,11))
            if (citizen == 0 || citizen == 1) {
                validCitizen = true;
            }
            
            //luhnAlgrithm call
            var sum : number = 0;
            for (let index = 0; index < 13; index++) {// for the length of the id
                //if index is even
                if(index%2 == 0){
                    sum += parseInt(idNo[index]);
                    //console.log("in even " + sum)
                }
                //if index is odd
                else{
                    //console.log("in even")
                    var doubledDigit : number = 2*parseInt(idNo[index])
                    //double the digit if it is less than or equal to 9
                    if (doubledDigit <=9 && doubledDigit > -1 ) {
                        sum += doubledDigit
                        //console.log("doubled >=9")
                    }
                    // if its greater than 9 add the numbers two digits e.g. 8*2 = 16 1+6 = 7
                    else if (doubledDigit > 9 ) {
                        var firstDigit: string = doubledDigit.toString().slice(0,1)
                        var lastDigit: string = doubledDigit.toString().slice(1)
                        var toAdd : number = parseInt(lastDigit) + parseInt(firstDigit)
                        sum += toAdd
                        //console.log("doubled <9")
                    }

                    //console.log("in odd " + sum)
                }
                
            }


            var checksum: number =sum%10
            
            if ( checksum== 0) {
                validCheckSum = true;
            }


        }

        // if all the aspects of the id are valid return false ... there is no error
        //console.log(validDOB + " "+validGender +' '+ validCitizen +' '+ validCheckSum)
        if (validDOB && validGender && validCitizen && validCheckSum) {
            return null
        }

        return {'validID' : true} // there is an error
    }

    
} 