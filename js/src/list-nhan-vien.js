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
var NhanVienA=new NhanVien('duyp7484','duyp7484@gmail.com','Duy','kh001','1/1/1111',7,"123456","xuatxac")
var NhanVienB=new NhanVien('duyp7454','v@gmail.com','asd','kh001','1/1/1111',7,8,4,"123456")
var danhSachNhanVien=new ListNhanVien();
danhSachNhanVien.themDanhSachNhanVien(NhanVienA);
danhSachNhanVien.themDanhSachNhanVien(NhanVienB);
console.log(danhSachNhanVien.danhSachNhanVien);
// xoá
 danhSachNhanVien.xoaNhanVien('duyp')

// danhSachNhanVien.xoaNhanVien('duyp7454');
console.log(danhSachNhanVien.danhSachNhanVien);
// console.log('tim kiem sinh vien theo MSV',danhSachNhanVien.timKiemNhanVien("Duy"));
console.log('tim kiem sinh vien theo MSV',danhSachNhanVien.timKiemNhanVienTK("duyp7484"));
NhanVienA.email="Duydeptrai";
console.log(danhSachNhanVien.danhSachNhanVien);
console.log("Cap nhan nhan vien",danhSachNhanVien.capnhanNhanVien(NhanVienA));
console.log(danhSachNhanVien.danhSachNhanVien);