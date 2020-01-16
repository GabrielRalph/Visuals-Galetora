% Analysing audio test for audio visuals
% Aim to detect the beat of songs

[samplesB, fs] = audioread('location.wav');
samplesN = samplesB(fs*30:fs*38, :);
samples = (samplesN(:, 1) + samplesN(:, 2))/2;
n = length(samples);

x = 350;
y = zeros(n-x, 1);
ly = mean(samples(1:x));
for i = 1:(n - x - 1)
  y(i) = ly + (samples(i+x)  - samples(i))/x;
  ly = y(i);
end

plot(y);
% samples = y;
% n = length(samples);
% ss = 512;
% y = [];
obj = audioplayer(samplesN, fs);
obj.play()
% x = 60;
% fy = zeros(51, 1);
% for i = 1:(n/ss)
%     y2 = abs(fft(samples((1 + (i-1)*ss):(i*ss)))/ss);
%     y1 = y2(1:(ss/2+1));
%     y1(2:end-1) = 2*y1(2:end-1);
%     fy = sum(y1(x:x+50));
%     y = [y; fy]; 
% end
%  plot(y);
% 
%  n2 = length(y);
% x = 12;
% y2 = zeros(n2-x, 1);
% ly = mean(samples(1:x));
% for i = 1:(n2 - x - 1)
%   y2(i) = ly + (y(i+x)  - y(i))/x;
%   ly = y2(i);
% end
% plot(y2>0);