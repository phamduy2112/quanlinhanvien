// tao 1 doi tuong 
var dsNV=new ListNhanVien();
var themNV=document.querySelector("#btnThemNV");
var formNV=document.querySelector(".form-NV");
var capNhanNV=document.querySelector("#btnCapNhat");
// them6 sinh vine
var isEdit=false;
// thêm nhân viên
themNV.onclick=function(event){
    event.preventDefault();
    console.log("Thành công");
    var nv={};
    isEdit=false;
    doiTrangThaiButton();
    var giaTriForm=document.querySelectorAll('.form-NV input,.form-NV select');
    if (isValid() === false) {
        setTouches(true);
     
    
        renderErorrs();
        return;
      }
      else{
         giaTriForm.forEach(function(phantu){
   
        var thuocTinh=phantu.id;
        nv[thuocTinh]=phantu.value;
        // console.log(nv);
        // Tao 1 nhan vien
       
    })
     var nhanVien=new NhanVien(
        nv.tknv,
        nv.name,
        nv.email,
        nv.password, 
        nv.datepicker,
      
        nv.luongCB, 
        nv.chucvu,
        nv.gioLam,
        xepLoai(nv),
        tongLuongNV(nv),
        )
        
   
       

        themSinhVien(nhanVien);
        luuNhanVien();
        loadNhanVien();
        // reset form
       
        formNV.reset();  
      }
 
}
// cập nhận sv
capNhanNV.onclick=function(event){
    isEdit=true;
    
    if (isValid() === false) {
        setTouches(true);
     
    
        renderErorrs();
        return;
      }
    event.preventDefault();
    console.log("Thành công cập nhận");
    var nv={};
    var giaTriForm=document.querySelectorAll('.form-NV input,.form-NV select');
  
    giaTriForm.forEach(function(phantu){
   
        var thuocTinh=phantu.id;
        nv[thuocTinh]=phantu.value;
        // console.log(nv);
        // Tao 1 nhan vien
       
    })
     var nhanVien=new NhanVien(
        nv.tknv,
        nv.name,
        nv.email,
        nv.password, 
        nv.datepicker,
      
        nv.luongCB, 
        nv.chucvu,
        nv.gioLam,
        xepLoai(nv),
        tongLuongNV(nv),
        )
        
   
       
        capNhanNhanVien(nhanVien);
        luuNhanVien();
        loadNhanVien();
        // reset form
       
        formNV.reset();
}
// thêm sinh viên
function themSinhVien(nhanVien){
 
    dsNV.themDanhSachNhanVien(nhanVien);
}
// load nhan vien trong table
function loadNhanVien(danhSachNhanVien){
    var tableBodyHTML=``;
    if(!danhSachNhanVien) {
      danhSachNhanVien= dsNV.danhSachNhanVien;  
    } 
    danhSachNhanVien.forEach(function (nv) {
tableBodyHTML+=`<tr>
<td>${nv.taiKhoan}</td>
<td>${nv.ten}</td>
<td>${nv.email}</td>


<td>${nv.ngayLam}</td>

<td>${nv.chucVu}</td>
<td>${tongLuongNV(nv)}</td>
<td>${xepLoai(nv)}</td>

<td>
    <button class="btn btn-warning" onclick="xoaNhanVien('${nv.taiKhoan}')">Xoá</button>
    <button class="btn btn-danger" onclick="timKiemTK('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal">Sửa</button>
</td>
</tr>`;
  })

document.querySelector("#tableDanhSach").innerHTML=tableBodyHTML;

}
// lưu trên local
function luuNhanVien(){
    localStorage.setItem('dsnv',JSON.stringify(dsNV.danhSachNhanVien));
}
// lấy ra danh sách lưu trên local
function layDanhSachNV(){
    var ketqua=localStorage.getItem('dsnv');
    return JSON.parse(ketqua) || [];
}
// load lại
function layRaDSNV(){
    var danhSachNhanVien=layDanhSachNV();
    dsNV.danhSachNhanVien=danhSachNhanVien;
    loadNhanVien();

}
layRaDSNV();
// Xoá nhân viên
function xoaNhanVien(taikhoan){
    dsNV.xoaNhanVien(taikhoan);
    loadNhanVien();
    luuNhanVien();
}
// Tổng lương
function tongLuongNV(nv){
var tongLuong=0;
switch(nv.chucVu){
    case 'Sếp':
    tongLuong=nv.luongCoBan*3;
        break;
    case 'Trưởng phòng':
    tongLuong=nv.luongCoBan*2;
    break;
    case 'Nhân viên':
    tongLuong=nv.luongCoBan*1;
    break;
}
return tongLuong;
}
// xep loai nhân viên
function xepLoai(nv){
    var ketqua='';
    if(nv.gioLam>=192){
        ketqua='Nhân viên xuất sắc'
    }else if(nv.gioLam>=176){
        ketqua='Nhân Viên giỏi';
    }else if(nv.gioLam>=160){
        ketqua='Nhân viên khá';
    }else{
        ketqua="Nhân viên trung bình"
    }
    return ketqua;
}
// tìm kiếm xuất xắc
document.querySelector("#btnTimNV").onclick=function(){
    const giaTriTimKiem=document.querySelector("#searchName").value;
    var danhSachTimDuoc=dsNV.timKiemNhanVien(giaTriTimKiem);
    document.querySelector("input#searchName").value="";
    loadNhanVien(danhSachTimDuoc);
}
// tìm kiếm tên tài khoản;
function timKiemTK(nv){
    var nhanVien=dsNV.timKiemNhanVienTK(nv);
    console.log(nhanVien);
    loadDulieulenform(nhanVien);
  
}
// load du lieu update lên form
function loadDulieulenform(nv){
    var giaTriForm=document.querySelectorAll('.form-NV input,.form-NV select');
    var mapper={
        tknv:"taiKhoan",
      name:"ten",
       email:"email",
        password:"matKhau", 
        datepicker:"ngayLam",
      
        luongCB:"luongCoBan", 
        chucvu:"chucVu",
        gioLam:"gioLam",
 }

    giaTriForm.forEach(function(ele){
        var thuocTinh=mapper[ele.id];
        ele.value=nv[thuocTinh];


    })
    isEdit=true;
    doiTrangThaiButton();
   

}
// cap nhan sinh vien
function capNhanNhanVien(nhanVien){
dsNV.capnhanNhanVien(nhanVien);
isEdit=false;
doiTrangThaiButton();
}
// Button
function doiTrangThaiButton(){
    

    if(isEdit){
        document.querySelector('#btnThemNV').disabled=true;
        document.querySelector('#btnCapNhat').disabled=undefined;

    }else{
        document.querySelector('#btnThemNV').disabled=undefined
        document.querySelector('#btnCapNhat').disabled=true
    }
}
// gắn giá trị cho từng ô input
var touches={

}
var giaTriForm=document.querySelectorAll('.form-NV .form-group .input-group input,.form-NV .form-group .input-group select');
function handleBlur(event){
    // event.target:nó chỉnh là ô input của ct
console.log("ele",event.target.id,event.target.value);
// gán giá trị cho id là true
touches[event.target.id]=true;
console.dir(touches);
handleValidate(event);
renderErorrs();

}
giaTriForm.forEach(function (ele){
ele.onblur=handleBlur;

})
function handleValidate(event) {
    var id = event.target.id;
    var value = event.target.value;
  
    console.log(id);
    switch (id) {
      case "tknv": {
        errors[id] = new KiemTraLoi(value).boTrong().string().min(6).layLoiRa();
        break;
      }
      case "name": {
        errors[id] = new KiemTraLoi(value).boTrong().string().layLoiRa();
        break;
      }
      case "password": {
        errors[id] = new KiemTraLoi(value).boTrong().passWord().layLoiRa();
        break;
      }
      case "email": {
        errors[id] = new KiemTraLoi(value).boTrong().email().layLoiRa();
        break;
      }
      case "datepicker":{
        errors[id] = new KiemTraLoi(value).boTrong().layLoiRa();
        break;
      }
      case"luongCB":{
        errors[id] = new KiemTraLoi(value).boTrong().number().min(1000000).max(20000000).layLoiRa();
        break;
      }
    case "chucvu":{
        errors[id] = new KiemTraLoi(value).boTrong().layLoiRa();
        break;
    }
    case "gioLam":{
        errors[id] = new KiemTraLoi(value).boTrong().number().min(80).max(200).layLoiRa();
        break;
    }
    
      default:
    }
  }
// kt lỗi
var errors={
  
}

var layInput=document.querySelectorAll('.input-group');
function renderErorrs(){

    giaTriForm.forEach(function(ele){
        var thuocTinh=ele.id;
       
        var isValid=errors[thuocTinh] !=undefined && touches[thuocTinh]; // nếu có giá trị thì là true còn lại là falase
        if(!isValid){
               return;
              
        }
  console.log(errors[thuocTinh]);
      text=`<span class="sp-thongbao" id="tb">${errors[thuocTinh]}</span>`; 

      console.log(text);
    

    var nextEle=ele.parentElement.nextElementSibling;
    console.log(nextEle);
 
var meassageHtml=`${errors[thuocTinh]}`

if(nextEle){
// tạo mới ele
nextEle.innerHTML=meassageHtml;
}else{
    ele.insertAdjacentHTML('afterend',meassageHtml);

}


      
   
     
     


        
    })
}
//
function setTouches(value){
    giaTriForm.forEach(function (ele){
           touches[ele.id]=value;
    })
    }
    setTouches(false);
function isValid(){
   
if(Object.values(errors).length !== giaTriForm.length){
   setTouches(true);
   giaTriForm.forEach(function(ele){
 
    handleValidate({

   
    target: {
           id:ele.id,
           value:"",
    }
}
   );
 }) 
    return false;
 }

 var isTouth= Object.values(touches).every(function(item){
           return item;
    })

   
  
    var isMessage= Object.values(errors).every(function(item){
           // chứng tỏ k có message lỗi
           return item.length===0;
    })
    return isTouth && isMessage;
}

isValid();