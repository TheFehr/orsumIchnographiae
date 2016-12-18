#!/usr/bin/perl
use v5.10.0;
use warnings;
use DBI;
use diagnostics;
use CGI;
use JSON;

print "Content-Type: text/json; charset=utf-8\n\n";

sub selectEvents {
	my $db = shift;
	my $stmt = $db->prepare("SELECT events.ID as 'id', events.content as 'content', events.title as 'title', ort.name as 'ort', ort.breiten as 'breiten', ort.laengen as 'laengen', bewegung.ID as 'bewegung', monat.monat as 'monat', (SELECT jahre.jahr FROM jahre WHERE jahre.ID=monat.jahrIDFS) as 'jahr' FROM `events` JOIN ort ON ort.ID = events.ortIDFS JOIN bewegung ON bewegung.ID = events.bewegungIDFS JOIN monat ON monat.ID = events.monatIDFS");
	$stmt->execute() or die $stmt->err_str;
	
	return $stmt;
}


my ($db_user, $db_name, $db_pass) = ('3i', 'orsumIchnographiae', 'wurst');
my $db = DBI->connect("DBI:mysql:database=$db_name", $db_user, $db_pass);

$statement = selectEvents($db);

my %databaseData;
while (my ($id, $content, $title, $ort, $breiten, $laengen, $bewegung, $monat, $jahr) = $statement->fetchrow_array() ) {
	my %event = (
		"id" => $id,
		"content" => $content,
		"title" => $title,
		"ort" => $ort,
		"position" => [$breiten, $laengen],
		"monat" => $monat,
		"jahr" => $jahr
	);
	
	if (exists $databaseData{$bewegung}) {
		push($databaseData{$bewegung}, \%event);
	} else {
		$databaseData{$bewegung} = [\%event];
	}
}

my $json = new JSON;
print $json->pretty->encode(\%databaseData);
