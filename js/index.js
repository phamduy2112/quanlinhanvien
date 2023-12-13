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
        
   
       

        themSinhVien(nhanVien);
        luuNhanVien();
        loadNhanVien();
        // reset form
       
        formNV.reset();
}
// cập nhận sv
capNhanNV.onclick=function(event){
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

    }else{
        document.querySelector('#btnThemNV').disabled=undefined
    }
}
// kt lỗi
var errors={
    msv:"K bỏ trống"
}
var touches={

}
var giaTriForm=document.querySelectorAll('.form-NV input,.form-NV select');
giaTriForm.forEach(function (ele){
    
})
function renderErorrs(){
    
}