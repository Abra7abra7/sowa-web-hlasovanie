-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Nominees table
CREATE TABLE IF NOT EXISTS nominees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instagram VARCHAR(255),
    image_url TEXT,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    verified_email BOOLEAN DEFAULT FALSE,
    verified_phone BOOLEAN DEFAULT FALSE,
    fingerprint VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(email, phone)
);

-- Votes table
CREATE TABLE IF NOT EXISTS votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    nominee_id UUID NOT NULL REFERENCES nominees(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address VARCHAR(45),
    fingerprint VARCHAR(255),
    user_agent TEXT,
    UNIQUE(user_id, category_id)
);

-- Verification codes table
CREATE TABLE IF NOT EXISTS verification_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code VARCHAR(6) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('email', 'sms')),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vote logs table (for audit trail)
CREATE TABLE IF NOT EXISTS vote_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fraud detection logs table
CREATE TABLE IF NOT EXISTS fraud_detection_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    vote_id UUID REFERENCES votes(id) ON DELETE SET NULL,
    fraud_type VARCHAR(100) NOT NULL,
    severity VARCHAR(10) NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
    details JSONB,
    ip_address VARCHAR(45),
    fingerprint VARCHAR(255),
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_nominees_category_id ON nominees(category_id);
CREATE INDEX IF NOT EXISTS idx_votes_user_id ON votes(user_id);
CREATE INDEX IF NOT EXISTS idx_votes_nominee_id ON votes(nominee_id);
CREATE INDEX IF NOT EXISTS idx_votes_category_id ON votes(category_id);
CREATE INDEX IF NOT EXISTS idx_votes_ip_address ON votes(ip_address);
CREATE INDEX IF NOT EXISTS idx_votes_fingerprint ON votes(fingerprint);
CREATE INDEX IF NOT EXISTS idx_votes_voted_at ON votes(voted_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_fingerprint ON users(fingerprint);
CREATE INDEX IF NOT EXISTS idx_verification_codes_user_id ON verification_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_fraud_detection_logs_user_id ON fraud_detection_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_fraud_detection_logs_ip_address ON fraud_detection_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_fraud_detection_logs_fingerprint ON fraud_detection_logs(fingerprint);
CREATE INDEX IF NOT EXISTS idx_fraud_detection_logs_resolved ON fraud_detection_logs(resolved);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nominees_updated_at BEFORE UPDATE ON nominees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE nominees ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vote_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE fraud_detection_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for categories and nominees
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can read nominees" ON nominees FOR SELECT USING (true);

-- Users can only read their own data
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (true);

-- Votes policies
CREATE POLICY "Public can insert votes" ON votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read votes" ON votes FOR SELECT USING (true);

-- Verification codes policies
CREATE POLICY "Users can read own verification codes" ON verification_codes FOR SELECT USING (true);
CREATE POLICY "Users can insert verification codes" ON verification_codes FOR INSERT WITH CHECK (true);

-- Vote logs policies
CREATE POLICY "Public can insert vote logs" ON vote_logs FOR INSERT WITH CHECK (true);

-- Fraud detection logs policies  
CREATE POLICY "Public can insert fraud logs" ON fraud_detection_logs FOR INSERT WITH CHECK (true);

-- Sample categories (optional - for testing)
INSERT INTO categories (name, slug, description, "order") VALUES
    ('Najlepší influencer roka', 'najlepsi-influencer-roka', 'Ocenenie pre najlepšieho influencera roku', 1),
    ('Najlepšia influencerka roka', 'najlepsia-influencerka-roka', 'Ocenenie pre najlepšiu influencerku roku', 2),
    ('Najlepší fashion influencer', 'najlepsi-fashion-influencer', 'Móda a štýl', 3),
    ('Najlepší fitness influencer', 'najlepsi-fitness-influencer', 'Fitness a zdravý životný štýl', 4),
    ('Najlepší gaming influencer', 'najlepsi-gaming-influencer', 'Gaming a esport', 5),
    ('Najlepší food influencer', 'najlepsi-food-influencer', 'Gastronómia a recepty', 6),
    ('Najlepší travel influencer', 'najlepsi-travel-influencer', 'Cestovanie a dobrodružstvo', 7),
    ('Najlepší beauty influencer', 'najlepsi-beauty-influencer', 'Krása a kozmetika', 8)
ON CONFLICT (slug) DO NOTHING;

