<?php
// ===== رمز پنل مدیریت را حتماً تغییر بده =====
$PASSWORD = 'ChangeMe123';
// =============================================
header('Content-Type: application/json; charset=utf-8');
$in = json_decode(file_get_contents('php://input', false, null, 0, 8000000), true);
if (!is_array($in) || !isset($in['password']) || !hash_equals($PASSWORD, (string)$in['password'])) {
  usleep(800000); http_response_code(403); echo json_encode(['error'=>'auth']); exit;
}
if (!empty($in['check'])) { echo json_encode(['ok'=>true]); exit; }
$d = $in['data'] ?? null;
if (!is_array($d) || !isset($d['products'], $d['contact'])) { http_response_code(400); echo json_encode(['error'=>'bad']); exit; }
$out = ['ok'=>true];
if (!empty($in['hero']) && preg_match('#^data:image/jpeg;base64,(.+)$#', $in['hero'], $m)) {
  $bin = base64_decode($m[1], true);
  if ($bin !== false && @getimagesizefromstring($bin)) {
    if (!is_dir(__DIR__.'/images')) mkdir(__DIR__.'/images', 0755, true);
    file_put_contents(__DIR__.'/images/hero.jpg', $bin);
    $d['hero'] = 'images/hero.jpg?v='.time(); $out['hero'] = $d['hero'];
  }
}
if (isset($d['hero']) && strpos($d['hero'], 'data:') === 0) $d['hero'] = 'images/hero.jpg';
$ok = file_put_contents(__DIR__.'/data.json', json_encode($d, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT), LOCK_EX);
if ($ok === false) { http_response_code(500); echo json_encode(['error'=>'write']); exit; }
echo json_encode($out);
