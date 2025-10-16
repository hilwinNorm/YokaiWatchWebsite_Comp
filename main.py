
import socket
import time
import os
import urllib.parse
from datetime import datetime

SERVER_HOST = "0.0.0.0"
SERVER_PORT = 8080

# Security settings
MAX_REQUEST_SIZE = 1024 * 8  # 8KB max request size
RATE_LIMIT = 512  # requests per minute per IP

request_log = {}

def is_rate_limited(client_ip):
    """Basic rate limiting"""
    now = time.time()
    minute = int(now // 60)
    key = f"{client_ip}_{minute}"
    
    if key not in request_log:
        request_log[key] = 0
    
    request_log[key] += 1
    
    # Clean old entries (older than 2 minutes)
    for k in list(request_log.keys()):
        if int(k.split('_')[1]) < minute - 1:
            del request_log[k]
    
    return request_log[key] > RATE_LIMIT

def get_content_type(filename):
    """Determine Content-Type based on file extension"""
    content_types = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.webp': 'image/webp',
        '.otf': 'font/otf',
        '.ttf': 'font/ttf',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.eot': 'application/vnd.ms-fontobject',
        '.txt': 'text/plain'
    }
    ext = os.path.splitext(filename)[1].lower()
    return content_types.get(ext, 'text/plain')

# Allowed file extensions for security
ALLOWED_EXTENSIONS = {'.html', '.css', '.js', '.json', '.png', '.jpg', '.jpeg', 
                      '.gif', '.svg', '.ico', '.webp', '.otf', '.ttf', '.woff', 
                      '.woff2', '.eot', '.txt'}

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((SERVER_HOST, SERVER_PORT))
print(f"Socket bound to {SERVER_HOST}:{SERVER_PORT} - Waiting for connections...")
server_socket.listen(10)

print("=" * 50)
print("Yokai Watch Competitive Hub Server")
print(f"Starting on port {SERVER_PORT}")
print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print("=" * 50)
print("To access from internet:")
print("1. Configure port forwarding on your router")
print("2. Use your public IP address")
print("3. Press Ctrl+C to stop the server")
print("=" * 50)


while True:
    client_socket, client_address = server_socket.accept()

    #print("connection: ", client_socket)
    print("client address: ", client_address)
    
    # Rate limiting
    if is_rate_limited(client_address[0]):
        print(f"[RATE LIMIT] {client_address[0]} - Too many requests")
        response = 'HTTP/1.1 429 Too Many Requests\n\nRate limit exceeded'
        client_socket.sendall(response.encode())
        client_socket.close()
        continue
        
    try:
        request = client_socket.recv(MAX_REQUEST_SIZE).decode()
        if not request:
            client_socket.close()
            continue
            
        headers = request.split('\n')
        first_header_components = headers[0].split(" ")
        
        if len(first_header_components) < 2:
            client_socket.close()
            continue
            
        http_method = first_header_components[0]
        path = first_header_components[1]

        # Log the request
        timestamp = datetime.now().strftime('%H:%M:%S')
        #print(f"[{timestamp}] {client_address[0]} - {http_method} {path}")
        
        if http_method == "GET":
            path = urllib.parse.unquote(path.split('?')[0])
            
            if path == '/':
                path = '/index.html'
            
            # Security checks
            if '..' in path or path.startswith('/.') or '//' in path:
                print(f"  [BLOCKED] Suspicious path: {path}")
                response = 'HTTP/1.1 403 Forbidden\n\nInvalid path'
                client_socket.sendall(response.encode())
                client_socket.close()
                continue
            
            filepath = path[1:]
            
            # Check file extension
            file_ext = os.path.splitext(filepath)[1].lower()
            if file_ext not in ALLOWED_EXTENSIONS:
                print(f"  [BLOCKED] Disallowed file type: {file_ext}")
                response = 'HTTP/1.1 403 Forbidden\n\nFile type not allowed'
                client_socket.sendall(response.encode())
                client_socket.close()
                continue
            
            if not filepath or os.path.isdir(filepath):
                filepath = os.path.join(filepath, 'index.html') if filepath else 'index.html'
            
            if os.path.exists(filepath) and os.path.isfile(filepath):
                try:
                    content_type = get_content_type(filepath)
                    
                    binary_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.webp', 
                                       '.otf', '.ttf', '.woff', '.woff2', '.eot')
                    
                    if any(filepath.lower().endswith(ext) for ext in binary_extensions):
                        with open(filepath, 'rb') as fin:
                            content = fin.read()
                        response = f'HTTP/1.1 200 OK\nContent-Type: {content_type}\n\n'.encode() + content
                        #print(f"  [SERVED] {filepath} ({len(content)} bytes)")
                    else:
                        with open(filepath, 'r', encoding='utf-8') as fin:
                            content = fin.read()
                        response = f'HTTP/1.1 200 OK\nContent-Type: {content_type}\n\n{content}'
                        response = response.encode()
                        #print(f"  [SERVED] {filepath}")
                        
                except Exception as e:
                    print(f"  [ERROR] reading {filepath}: {str(e)}")
                    response = f'HTTP/1.1 500 Internal Server Error\n\nError reading file: {str(e)}'
                    response = response.encode()
            else:
                print(f"  [404] File not found: {filepath}")
                response = 'HTTP/1.1 404 Not Found\n\nFile Not Found'
                response = response.encode()
        else:
            print(f"  [405] Method not allowed: {http_method}")
            response = "HTTP/1.1 405 Method Not Allowed\n\nAllow: GET"
            response = response.encode()
        
        client_socket.sendall(response)
        
    except Exception as e:
        print(f"[ERROR] Handling client {client_address[0]}: {str(e)}")
    
    finally:
        client_socket.close()
