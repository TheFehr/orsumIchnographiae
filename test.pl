#!/usr/bin/perl
 
print "Content-type: text/html\n\n";
print "<html><head><title>Erlaubte Modulverzeichnisse</title>\n";
print "</head><body>\n";
print "<h1>Verzeichnisse zum Ablegen von Moduldateien:</h1>\n";
foreach (@INC) {
 print "<tt>$_</tt><br>\n";
}
print "</body></html>\n";
