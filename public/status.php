<?php
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

$visitorCount = 0;

function sendEvent($event, $data) {
  echo "event: $event\n";
  echo "data: $data\n\n";
  ob_flush();
  flush();
}

while (true) {
  $visitorCount += rand(1, 3);
  sendEvent("visitorCount", json_encode(array("visitorCount" => $visitorCount)));
  sleep(1);
}
?>
