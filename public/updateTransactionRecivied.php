<?php 

	session_start();

?>
<?php include("connection.php")?>
<!--
<!DOCTYPE html>
<html>
<head>
	<title>admin Panel suraksha</title>
</head>
   <a href="adminLogout.php"><button class="btnHome">logout</button></a>

</body>
</html>

-->


<!DOCTYPE html>
<html>
<head>
  <title>Admin Panel </title>
  <!--cdn icon library -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="cssfile/sidebar.css">
<link rel="stylesheet" href="cssfile/signUp.css">
	<style type="text/css">

			body{

		  background-image: url("image/20.jpg");
		  background-position: center;
		  background-size: cover;
		  height: 700px;
		  background-repeat: no-repeat;
      background-attachment: fixed;

		}
		.adminTopic{
			text-align: center;
			color: #fff;
			

		}
    .form_wrap .submit_btn:hover{

      color:#fff;
      font-weight: 600;

    }
    #decription{
      width: 100%;
      border-radius: 3px;
      border: 1px solid #9597a6;
      padding: 10px;
      outline: none;
      color: black;
    }
    .idclass{

      width: 100%;
      border-radius: 3px;
      border: 1px solid #9597a6;
      padding: 10px;
      outline: none;
      color: black;

    }




	</style>
</head>
<body>
  <input type="checkbox" id="check">

  <label for="check">
<i class="fa fa-bars" id="btn"></i>
<i class="fa fa-times" id="cancle"></i>


  </label>
  <div class="sidebar">
<header><img src="image/Re.png">
<p><?php echo $_SESSION['username']; ?></p>
</header>
<ul>

<li><a href="adminDash.php">Rotanızı ayarlama</a></li>
    <li><a href="ManagesBuses.php">Rota güncelleme</a></li>
    <li><a href="BookingManage.php">Rezervarsoynu tamamlanan müşteriler </a></li>
    <li><a href="PaymentManage.php">Ücretlendirme işlemleri bitmiş müşteriler</a></li>
    <li><a href="adminLogout.php">Çıkış</a></li>
  <!--  <li><a href="#">Event</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Service</a></li>
    <li><a href="#">Contact</a></li>-->
    </ul>
 <!--  <li>
      <div class="social-links">
        <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
        <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
        <a href="#" class="instagram"><i class="fa fa-instagram"></i></a>
        <a href="#" class="google-plus"><i class="fa fa-youtube"></i></a>
        
      </div>
    </li>-->
   

</div>
<!-------------------------------------------------->
   

   <?php 


      

       if(isset($_POST['updateTransaction'])){

       $id=$_POST['id'];  
     
      $name=$_POST['name'];
      $email=$_POST['email'];
      $address=$_POST['address'];
      $city=$_POST['city'];
      $amount=$_POST['amount'];

       $query="UPDATE `payment` SET amount='$amount',name='$name',email='$email',address='$address',city='$city' where id=$id";


       $query_run=mysqli_query($conn,$query);

      
  

         if($query_run){

            /*
      
                    //redirect to your profile page//

                    header("Location: adminDash.php");
       
                    die;

                 
*/
              echo ("<script LANGUAGE='JavaScript'>
    window.alert('Başarılı!!!');
    window.location.href='PaymentManage.php';
    </script>");


        //   echo '<script type="text/javascript">alert("Booking udated sucessfully!!!")</script>';


          }

          else{

               echo '<script type="text/javascript">alert("Başarısız!!!")</script>';
           }

           

     }

?>



<div class="sidebar2">




   
          

          <div class="wrapper">
  <div class="registration_form">
    <div class="title">
    Güncelle
    </div>

    <form action="#" method="POST">
      <div class="form_wrap">


        <div class="input_wrap">
          <label for="title">Id</label>
          <input type="number" id="title" name="id" class="idclass" value="<?php echo $_GET['id'];?>">
        </div>

        <div class="input_wrap">
          <label for="title">Fiyat</label>
          <input type="number" id="title" name="amount" placeholder="Fiyat" class="idclass" required>
        </div>
        
        <div class="input_wrap">
          <label for="title">İsim</label>
          <input type="text" id="title" name="name" placeholder="İsim" required>
        </div>


        <div class="input_wrap">
          <label for="title">Adres</label>
          <input type="text" id="title" name="addres" placeholder="Address" >
        </div>

        <div class="input_wrap">
          <label for="title">E-mail</label>
          <input type="E-mail" id="title" name="email" placeholder="E-mail" class="idclass" required>
        </div>

        <div class="input_wrap">
          <label for="title">Şehir</label>
          <input type="text" id="title" name="city" placeholder="Şehi" required>
        </div>

        <div class="input_wrap">
          <input type="submit" value="Update Now" class="submit_btn" name="updateTransaction">

        </div>



      </div>
    </form>
  </div>
</div>





</div>

</body>
</html>