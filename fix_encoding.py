with open(r'c:\Users\Alex\Documents\GitHub\Visionwatch\ts\src\desktop\desktop.html', 'rb') as f:
    raw = f.read()

# Strip BOM
if raw[:3] == b'\xef\xbb\xbf':
    raw = raw[3:]

# Find a known garbled sequence to understand the encoding
idx = raw.find(b'\xd0\x9f\xd1\x80\xd0\xbe')  # UTF-8 for Про
print('Found Cyrillic UTF-8 at:', idx)

idx2 = raw.find(b'\xd0\xa0\xd0\xb4\xd0\xb6')
print('Found garbled at:', idx2)

# Show bytes around position 100
print('Bytes 400-450:', raw[400:450].hex())
print('As UTF-8:', raw[400:450].decode('utf-8', errors='replace'))
print('As cp1252:', raw[400:450].decode('cp1252', errors='replace'))
