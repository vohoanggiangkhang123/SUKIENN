# 4.6 CI/CD — GitHub Actions

## Tên công cụ (bắt buộc)

| Thành phần | Phiên bản / ghi chú |
|------------|---------------------|
| **GitHub Actions** | Nền tảng CI/CD tích hợp sẵn trên GitHub |
| **Runner** | `ubuntu-latest` (Ubuntu mới nhất do GitHub cung cấp) |
| **Node.js** | `22` (action `actions/setup-node@v4`) |
| **Docker Buildx** | `docker/setup-buildx-action@v3` (plugin build Docker) |
| **Docker Compose** | Có sẵn trên runner Ubuntu (lệnh `docker compose`) |

Các **action** chính (thư viện có sẵn trên GitHub Marketplace):

| Action | Phiên bản tag | Vai trò |
|--------|----------------|--------|
| `actions/checkout@v4` | v4 | Clone mã nguồn vào runner |
| `actions/setup-node@v4` | v4 | Cài Node.js, cache `npm` |
| `docker/setup-buildx-action@v3` | v3 | Bật Docker Buildx để build image |

File cấu hình: **`.github/workflows/ci.yml`** (định dạng YAML).

---

## Pipeline / Workflow — các giai đoạn

Workflow chạy khi **push** hoặc **pull request** vào nhánh `main` / `develop`.

1. **Build**
   - Checkout code.
   - Cài Node 22, cache npm (theo `frontend/package-lock.json`).
   - **Frontend:** `npm ci` + `npm run build` (Vite → thư mục `dist`).
   - **Backend:** `npm ci` (cài dependency Express, Mongoose, …).

2. **Test** (chỉ chạy khi **Build** thành công — `needs: build`)
   - **Frontend:** `npm run lint` (ESLint).
   - **Backend:** `npm test` → `node --check server.js` (kiểm tra cú pháp file chính).

3. **Deploy** (chỉ chạy khi **Test** thành công — `needs: test`)
   - Bật Docker Buildx.
   - **`docker compose build`**: build image `api` và `web` theo `docker-compose.yml` + `Dockerfile` (xác nhận stack Docker sẵn sàng chạy).
   - Bước cuối in thông báo tóm tắt (triển khai thực tế có thể thêm push lên registry hoặc SSH tới server — tùy dự án).

Luồng phụ thuộc: `build` → `test` → `deploy`.

---

## Gợi ý chấm điểm / báo cáo

- **≥ 3 màn hình pipeline** (trạng thái khác nhau): chụp tab **Actions** trên GitHub khi workflow **đang chạy**, **thành công (green)**, và **thất bại (red)** — ví dụ tạm sử một dòng để ESLint fail rồi push, sau đó sửa lại và push thành công.
- **Lịch sử CI/CD**: chụp danh sách workflow runs (cùng repo → **Actions**).

---

## Chạy kiểm tra trên máy local

```bash
# Giống bước Build + Test (rút gọn)
cd frontend && npm ci && npm run build && npm run lint
cd ../backend && npm ci && npm test

# Giống bước Deploy
cd .. && docker compose build
```
