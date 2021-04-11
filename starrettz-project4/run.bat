javac *.java
Echo Starting Server
start cmd.exe /k java Server
Echo Starting Client 1
start cmd.exe /k java ClientWindow
timeout 1
Echo Starting Client 2
start cmd.exe /k java ClientWindow