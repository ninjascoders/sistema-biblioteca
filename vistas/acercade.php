<?php
//Activamos el almacenamiento en el buffer
ob_start();
session_start();

if (!isset($_SESSION["nombre"]))
{
  header("Location: index.php");
}
else
{
require 'header.php';
?>
<!--Contenido-->
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">        
        <!-- Main content -->
        <section class="content">
            <div class="row">
              <div class="col-md-12">
                  <div class="box">
                    <div class="box-header with-border">
                          <h1 class="box-title">Escritorio</h1>
                          <div class="box-tools pull-right">
                          </div>
                    </div>
                    <!-- /.box-header -->
                    <!-- centro -->
                    <div class="panel-body">
                      <h4>Proyecto: </h4> 
                      <p>Sistema Biblioteca</p>
                      <h4>Desarrollado por: </h4>
                      <p>Software</p>
                      <P>Software Curso</P>
                      <p>2021</p>
                      <p>Curso</p>
                      <a href="#" target="_blank"><p>Sistema Biblioteca</p></a>
                    </div>
                    <!--Fin centro -->
                  </div><!-- /.box -->
              </div><!-- /.col -->
          </div><!-- /.row -->
      </section><!-- /.content -->

    </div><!-- /.content-wrapper -->
  <!--Fin-Contenido-->
<?php
require 'footer.php';
?>
<?php 
}
ob_end_flush();
?>
<script type="text/javascript">
  $('#siAcercade').addClass("active");
</script>


