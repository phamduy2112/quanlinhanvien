/**
 * @param {string} value giá trị ng dùng nhập vào 
 * */  
function KiemTraLoi(value){
    this.value=value;
    this.message="";
    this.boTrong=function (message){
        if(this.value.trim().length===0){
            if(this.message) return this;
            this.message=message || "không dc bỏ trống"
        }
        return this
    }
    this.string=function(message){
        var kiemTraString=/^[a-zA-Z]/
        if(!kiemTraString.test(this.value)){
            this.message=message || "Không phải là kí tự"
        }
        return this;
    }
    this.min=function(valueMin,message){
        if(this.message) return this;
        var regexNumber = /^-?\d*\.?\d+$/;
        if(regexNumber.test(this.value.trim())){
            if(Number(this.value) <= valueMin ){
                this.message=message|| "Không được nhỏ hơn số "+valueMin
        }  
        }else{
            if(this.value.trim().length <= valueMin){
                this.message=message|| `Không dc ít hơn ${valueMin} kí tự`
            }
        }
        return this
      
    }
    this.max=function(valueMax,message){
        if(this.message) return this;
        var regexNumber = /^-?\d*\.?\d+$/;

        if(regexNumber.test(this.value.trim())){
            if(Number(this.value) > valueMax){
                this.message=message || "Không được lớn hơn số "+valueMax;
            }
        }else{
            if(this.value.trim().length>valueMax){
                this.message=message || `Không dc lớn hơn ${valueMax} kí tự`
            }
        }
        return this;
    }
    this.passWord = function (message) {
        if (this.message) return this;
        var regexPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
        if (!regexPw.test(this.value)) {
          this.message = message || "Ít nhất là 1 ký tự chữ và có 1 ký tự số";
        }
        return this;
      };
    this.layLoiRa= function(){
        return this.message;
    }
}

console.log(new KiemTraLoi ("123").boTrong().string().layLoiRa());