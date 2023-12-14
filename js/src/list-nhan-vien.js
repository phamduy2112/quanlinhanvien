function ListNhanVien(){
    this.danhSachNhanVien=[];
    this.themDanhSachNhanVien=function(nv){
        this.danhSachNhanVien.push(nv);
    }
    this.xoaNhanVien=function(taiKhoanNV){
 var capNhanDanhSachNV=this.danhSachNhanVien.filter(function(nv){
        return !(nv.taiKhoan===taiKhoanNV)
    })
   this.danhSachNhanVien=capNhanDanhSachNV;    
}
this.timKiemNhanVien=function(loaiNv){
    if(loaiNv===undefined || loaiNv==""){
        return this.danhSachNhanVien;
    }
    var listNV;
    listNV= this.danhSachNhanVien.filter(function(nv){
    return nv.xeploai.toLowerCase().includes(loaiNv.toLowerCase());
})
    return listNV;
}
this.timKiemNhanVienTK=function(taikhoan){

    return this.danhSachNhanVien.find(function(nv){
        return nv.taiKhoan===taikhoan;
    })
}
this.capnhanNhanVien=function(nv){
var index =this.danhSachNhanVien.findIndex(function(nhanvien){
    return nv.taiKhoan == nhanvien.taiKhoan;
})
// nếu k tìm thấy sẽ dừng vòng lặp
if(index===-1) return;
/// cập nhật lại giá trị của index
this.danhSachNhanVien[index]=nv;
}

   
}
