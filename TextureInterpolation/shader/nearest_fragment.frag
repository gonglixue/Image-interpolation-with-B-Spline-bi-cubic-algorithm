#version 330 core
in vec3 ourColor;
in vec2 TexCoord;

out vec4 color;

uniform sampler2D ourTexture1;

void main()
{
	//vec4 Data = BiCubic(ourTexture1,TexCoord);
	vec4 Data = texture2D(ourTexture1,TexCoord);
    color = Data;
}